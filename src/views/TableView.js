import Backbone from 'backbone';

export default Backbone.View.extend({
    tagName: "table",
    className: "tableView",
    template: _.template(` <thead>
                                <tr>
                                    <% columns.forEach(function(column){ %>
                                        <th class="<%= column.class %>" data-property="<%= column.property %>"><%= column.header || column.property %><div class="order <%= order.property === column.property ? order.direction : '' %>"></div> </th>
                                        <% }) %>
                                </tr>
                            </thead>
                            <tbody>
                                <% data.forEach(function(entry, index){ %>
                                    <tr id="<%= entry[idAttribute || "id"] %>" >
                                        <% columns.forEach(function(column){ %>
                                            <td class="<%= column.class %>"><%= column.transform ? column.transform(entry[column.property]) : entry[column.property] %></td>
                                            <% }) %>
                                    </tr>
                                    <% }) %>
                            </tbody>`),
    initialize(options = {}) {
        this.columns = options.columns || [];
        this.order = options.order || {
            direction: 'asc',
            property: ""
        };
        this.idAttribute = options.idAttribute;
        this.orderBy();
    },
    events: {
        'click th': 'sort'
    },
    sort(event, el) {
        this.order.direction = (this.order.property === el.dataset.property && this.order.direction === 'asc') ? 'desc' : 'asc';
        this.orderBy(el.dataset.property);
    },
    orderBy(property, direction) {
        const oldProperty = this.order.property;
        this.order.property = property || this.order.property;
        this.order.direction = direction || this.order.direction;

        this.collection.comparator = (modelA, modelB) => {
            let result = 0;
            let a = modelA.get(this.order.property);
            let b = modelB.get(this.order.property);

            if (typeof a === 'number') {
                result = a - b;
                result = result / Math.abs(result);
            } else if (a instanceof Date) {
                result = a.getTime() - b.getTime();
                result = result / Math.abs(result);
            } else if (typeof a === 'string') {
                result = a.localeCompare(b);
                result = result / Math.abs(result);
            }
            return this.order.direction === 'desc' ? -1 * result : result;
        };
        this.collection.sort();
        this.render();
    },
    render(data = {}) {
        this.el.innerHTML = this.template({
            columns: this.columns,
            data: this.collection.toJSON(),
            idAttribute: this.idAttribute,
            order: this.order
        });
        this.delegateEvents();
    }
});