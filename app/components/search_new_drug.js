var SearchMixin = require('../mixins/search_mixin');
var React = require('react/addons');

var SearchNewDrug = React.createClass({
  mixins: [SearchMixin],

  searchCursor: 'searchNew',

  resultsCursor: 'newDrug',

  placeholder: `I'm about to take`
});

module.exports = SearchNewDrug;