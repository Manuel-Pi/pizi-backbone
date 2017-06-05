/*jshint loopfunc: true */

import Backbone from "backbone";

const Model = Backbone.Model.extend({
    dates: [],
    initialize() {
        _.each(this.relations, (definition, key) => {
            let opts = {};
            opts[definition.relationAttribute] = this.id;
            const fetch = this.attributes[key].fetch;
            this.attributes[key].fetch = (options) => fetch.call(this.attributes[key], _.defaults(options, { data: opts }));
            this.attributes[key].on('add', (model) => {
                model.attributes[definition.relationAttribute] = this.id;
            })
        });
    },
    validate(attrs, options) {
        var dates = _.pick(attrs, this.dates.concat(['date']));
        for (var date in dates) {
            if (dates[date] && !(dates[date] instanceof Date)) {
                return date;
            }
        }
    },
    save(attrs, options = { parse: false }) {
        if (options.all) {
            var success = options.success;
            options.success = (model, resp, opts) => {
                _.each(this.relations, (relation, key) => {
                    if (relation.collection && model.get(key) instanceof relation.collection) {
                        _.each(model.get(key).models, (model) => {
                            model.save(null, { all: options.all });
                        });
                    }
                });
                if (success) success.call(this, model, resp, options);
            };
        }
        // Proxy the call to the original save function
        Backbone.Model.prototype.save.call(this, attrs, options);
    },
    fetch(options = {}) {
        if (options.relations === 'all') {
            var success = options.success;
            options.success = (model, resp, opts) => {
                _.each(this.relations, (relation, key) => {
                    if (relation.entity.collection && model.get(key) instanceof relation.entity.collection) {
                        model.get(key).fetch();
                    }
                });
                if (success) success.call(this, model, resp, options);
            };
        }
        Backbone.Model.prototype.fetch.call(this, options);
    },
    toJSON(options = {}) {
        var attributes = _.clone(this.attributes);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                if (attributes[attribute] instanceof Backbone.Model) {
                    attributes[attribute] = options.all ? _.pick(attributes[attribute], "id") : attributes[attribute].toJSON(options);
                } else if (attributes[attribute] instanceof Backbone.Collection) {
                    var converted = [];
                    attributes[attribute].forEach(attr => converted.push(options.all ? _.pick(attr, 'id') : attr.toJSON(options)));
                    attributes[attribute] = converted;
                }
            }
        }
        return attributes;
    },
    set: function(key, val, options) {
        if (key === null) return this;
        var attributes;
        if (typeof key === 'object') {
            attributes = key;
            options = val;
        } else {
            (attributes = {})[key] = val;
        }
        var opts = _.extend({ validate: true }, options);
        var relations = _.keys(this.relations);
        _.each(attributes, (value, key) => {
            if (_.contains(relations, key)) {
                var definition = this.relations[key];
                attributes[key] = new definition[definition.collection ? 'collection' : 'model'](value, opts);
            }
            if (this.dates.concat(['date']).includes(key) && !(value instanceof Date)) {
                attributes[key] = new Date(value);
            }
        }, this);
        return Backbone.Model.prototype.set.apply(this, [attributes, options]);
    }
});

/**
 * Extend the Backbone.Model.extend method, to add some treatement on instance creation
 * @param  {Object} modelDefinition
 * @return {function} the model constructor
 */
Model.extend = function(modelDefinition) {
    // Set defaults collections for relations
    var defaultRelations = {};
    var instance = this;
    _.each(modelDefinition.relations, (definition, key) => {
        defaultRelations[key] = new definition[definition.collection ? "collection" : "model"](modelDefinition.defaults[key]);
        defaultRelations[key].on('change sync reset update', function() {
            instance.trigger('change');
        });
    });
    _.extend(modelDefinition.defaults, defaultRelations);
    return Backbone.Model.extend.call(this, modelDefinition);
};

/**
 * The Collection
 * @type {Backbone.Collection}
 */
const Collection = Backbone.Collection.extend({
    /* Used to instanciate a new Model from Json (need to override if subtypes)*/
    model: Model
});

/**
 * Exporting the Model and the Collection
 */
export default {
    Model,
    Collection
};