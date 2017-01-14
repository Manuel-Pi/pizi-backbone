import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "table",
    className: "tableView",
    template: _.template(` <thead>
                                <tr>
                                    <% columns.forEach(function(column){ %>
                                        <th class="<%= column.class %>"><%= column.header || column.property %><div class="arrow-up order"></div><div class="arrow-down order"></div></th>
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
    },
    events: {
        'click .close': 'onClose',
        'click .cancel': 'onClose',
        'click .ok': 'onOk',
        'click .custom': 'onCustom'
    },
    render(data = {}) {
        this.el.innerHTML = this.template({
            columns: this.columns,
            data: this.collection.toJSON()
        });
        this.delegateEvents();
    }
});