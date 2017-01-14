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
            let oldOrder = this.el.querySelector('th[data-property="' + this.order.property + '"] .order');
            oldOrder.classList.remove('asc');
            oldOrder.classList.remove('desc');
        }
        this.order = {
            direction: this.order.direction === 'asc' ? 'desc' : 'asc',
            property: el.dataset.property
        };
        el.classList.getElementsByClassName('order')[0].add(this.order.direction);
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