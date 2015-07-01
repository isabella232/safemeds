var classnames = require('classnames');
var React = require('react/addons');
var SideEffect = require('./side_effect');
var {Icon} = require('pui-react-iconography');

var types = React.PropTypes;

var SideEffects = React.createClass({
  propTypes: {
    sideEffects: types.object,
    newDrug: types.object.isRequired,
    $application: types.object.isRequired
  },

  back() {
    this.props.$application.merge({page: 'compare', sideEffects: null});
  },

  renderSummary() {
    var {newDrug, sideEffects, $application} = this.props;
    var existingDrugs = Object.keys(sideEffects || {});

    var summaryText = () => {
      if (sideEffects === null) return {text: 'Searching...'};

      if (!existingDrugs.length) return {text: 'Yay! There are no known interactions.', className: 'no-interactions'};

      return {text: `${existingDrugs.length} of ${$application.get('existingDrugs').length} medications interact with ${newDrug.name.toLowerCase()}`, className: 'interactions'};
    };
    var {className, text} = summaryText();
    return (<div className={classnames('summary', className)}>{text}</div>);
  },

  scrollTo(...args) {
    var scrollTo = require('scroll-to');
    scrollTo(...args);
  },

  click(key) {
    var {top} = React.findDOMNode(this.refs[`sideEffect${key}`]).getBoundingClientRect();
    this.scrollTo(0, window.scrollY + top - 40, {duration: 300});
  },

  renderTableOfContents() {
    var {newDrug, sideEffects} = this.props;
    var existingDrugs = Object.keys(sideEffects || {});

    sideEffects = existingDrugs.map((existingDrug, key) => {
      return (
        <li key={key}><a role="button" onClick={this.click.bind(this, key)}>{existingDrug.toLowerCase()} + {newDrug.name.toLowerCase()}</a></li>
      );
    });

    if (!sideEffects.length) return null;

    return (
      <div className="table-of-contents">
        <hr/>
        <ol>
          {sideEffects}
        </ol>
        <hr/>
      </div>
    );
  },

  renderContent() {
    var {newDrug, sideEffects} = this.props;
    var existingDrugs = Object.keys(sideEffects || {});

    sideEffects = existingDrugs.map(function(existingDrug, key) {
      return (
        <div className="interactions" key={key}>
          {key !== 0 && <hr/>}
          <SideEffect {...{existingDrug, newDrug, sideEffect: sideEffects[existingDrug]}} ref={`sideEffect${key}`}/>
        </div>
      );
    });

    return (
      <section>
        <nav>
          <a className="back" role="button" onClick={this.back}><Icon name="angle-left"/> go back</a>
          {this.renderSummary()}
        </nav>
        {this.renderTableOfContents()}
        {sideEffects}
      </section>);
  },

  render() {
    var {$application} = this.props;
    return (
      <div className="side-effects-page">
        {this.renderContent()}
      </div>
    );
  }
});


module.exports = SideEffects;