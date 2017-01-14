import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "table",
    className: "tableView",
    template: _.template(` <thead>
                                <tr>
                                    <% columns.forEach(function(column){ %>
                                        <th class="<%= column.class %>" data-property="<%= column.property %>"><%= column.header || column.property %><div class="order <%= order.property === column.property && order.direction %>"></div> </th>
                                        <% }) %>
                                </tr>
                            </thead>
                            <tbody>
                                <% data.forEach(function(entry, index){ %>
                                    <tr id="<%= index %>" >
                                        <% columns.forEach(function(column){ %>
                                            <td><%= column.transform ? column.transform(entry[column.property]) : entry[column.property] %></td>
                                            <% }) %>
                                    </tr>
                                    <% }) %>
                            </tbody>`),
    initialize(options = {}) {
        this.columns = options.columns || [];
        this.order = options.order || {
            direction: 'asc',
            property: ""
        }
    },
    events: {
        'click th': 'orderBy'
    },
    orderBy(event, el) {
        if (this.order.property) {
            this.el.querySelector('*[data-property="' + this.order.property + '"]').classList.remove('asc');
            this.el.querySelector('*[data-property="' + this.order.property + '"]').classList.remove('desc');
        }
        this.order = {
            direction: this.order.direction === 'asc' ? 'desc' : 'asc',
            property: el.dataset.property
        }
        this.collection.comparator = this.order.property;
        this.collection.sort();
    },
    render(data = {}) {
        this.el.innerHTML = this.template({
            columns: this.columns,
            data: this.collection.toJSON(),
            order: this.order
        });
        this.delegateEvents();
    }
});