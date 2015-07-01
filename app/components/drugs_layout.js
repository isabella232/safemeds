var Circle = require('./circle');
var {Icon} = require('pui-react-iconography');
var React = require('react/addons');
var Svg = require('./svg');
var AnimationMixin = require('../mixins/animation_mixin');
var types = React.PropTypes;

var DrugsLayout = React.createClass({
  mixins: [AnimationMixin],

  propTypes: {
    $application: types.object.isRequired
  },

  render() {
    var {$application} = this.props;
    var opacity = this.animate('opacity', $application.get('page') === 'compare' ? 1 : 0, 1000, {easing: 'linear'});
    var offset = this.animate('offset', $application.get('page') === 'compare' ? 0 : 232, 1000, {easing: 'easeOutBounce'});
    var leftStyle = {opacity, transform: `translate3d(${offset}px,0,0)`};
    var rightStyle = {opacity, transform: `translate3d(${-offset}px,0,0)`};
    return (
      <div className="drugs-layout">
        <div className="drugs-header">
          <div className="image-left" style={leftStyle}>
            <Svg className="pill-bottles" src="pill-bottles-with-bg"/>
          </div>
          <div className="image-center">
            <Circle {...{$application}}/>
          </div>
          <div className="image-right" style={rightStyle}>
            <Svg className="pill" src="pill-with-bg"/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = DrugsLayout;