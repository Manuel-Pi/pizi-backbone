import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "table",
    className: "tableView",
    template: _.template(` <thead>
                                <tr>
                                    <% columns.forEach(function(column){ %>
                                        <th class="<%= column.class %>" property="<%= column.property %>"><%= column.header || column.property %><div class="order <%= column.order.property && colum.order.direction %>"></div> </th>
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
        this.order = {
            direction: 'asc',
            property: ""
        }
    },
    events: {
        'click tr': 'orderBy'
    },
    orderBy(event, el) {
        this.order = {
            direction: this.order.direction === 'asc' ? 'desc' : 'asc',
            property: el.property
        }
        this.collection.comparator = this.order.property;
        this.collection.sort();
    },
    render(data = {}) {
        this.el.innerHTML = this.template({
            columns: this.columns,
            data: this.collection.toJSON()
        });
        this.delegateEvents();
    }
});