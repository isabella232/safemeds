var React = require('react/addons');
var Svg = require('./svg');

var Footer = React.createClass({
  render() {
    return (
      <footer>
        <div className="svg"><Svg src="alert-pill"/></div>
        <span className="arrow"/>
        <span className="disclaimer">Disclaimer</span>
        <p>Always consult your doctor before starting a new medication.</p>
        <span className="fine-print">This site is for informative information only.</span>
      </footer>
    );
  }

});

module.exports = Footer;