/** @jsx React.DOM */

define(['react', 'mixins', 'pgUtils', 'foafUtils', 'jsx!scripts/common/Pix'], function (React, mixins, pgUtils, foafUtils, Pix) {

var MainSearchBox = React.createClass({
    mixins: [mixins.WithLogger, mixins.WithLifecycleLogging],
    componentName: "MainSearchBox",

    getInitialState: function() {
        return {text: this.props.filterText};
    },

    render: function() {
        return (
            <form id="search" onSubmit={this._handleSubmit}>
                <input type="text"
                    placeholder="Search your contacts"
                    value={this.state.text}
                    width="100"
                    ref="url"
                    onChange={this._onChange}
                />
                <button type="submit"  class="fontawesome-ok"></button>
                <button type="submit" onClick={this._loadProfileFromUrl} class="fontawesome-ok">
                    <Pix src={this._getUserImg()}/>
                </button>
            </form>
            );
    },

    //
    _loadProfileFromUrl: function() {
        var profileURL = this.props.personPG.getSymbolPointerUrl();
        this.props.loadCurrentUserProfileFromUrl(profileURL);
    },

     /*
     * Handlers.
     * Use e.preventDefault() or return false to : Cancel browser default behavior of submit.
     * */
     _handleSubmit: function(e) {
         e.preventDefault();
        //this.props.onUserInput(this.state.text);
    },

    _onChange: function(e) {
        e.preventDefault();
        this.setState({text: e.target.value});
    },

    _getUserImg: function() {
        var personPG = this.props.personPG; // TODO remove when possible
        var imgUrlList = foafUtils.getImg([personPG]);
        if (!imgUrlList || imgUrlList.length == 0) return avatar;
        var imgUrlListCheck = _.chain(imgUrlList)
            .filter(function(img) {
                // TODO: temporary, need to check the validity of img Url.
                return img.indexOf("http") !== -1
            })
            .value();
        return imgUrlListCheck[0];
    }
});

    return MainSearchBox;
});