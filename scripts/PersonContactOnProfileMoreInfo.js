/** @jsx React.DOM */

var PersonContactOnProfileMoreInfo = React.createClass({
    render: function() {

        var moreInfo = this.props.getMoreInfo();

        return (
            <div className="moreInfo">
                <div className="lastInteraction"><span>{notifications.nbNewMessages}</span></div>
                <div className="nextStep"><a href="#">Start the conversation</a></div>
            </div>
            );
    }
});