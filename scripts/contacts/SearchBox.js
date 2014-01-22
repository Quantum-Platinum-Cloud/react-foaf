/** @jsx React.DOM */

var SearchBox = React.createClass({
    mixins: [WithLogger,WithLifecycleLogging],
    componentName: "SearchBox",

    getInitialState: function() {
        return {text: this.props.filterText};
    },

    handleSubmit: function(e) {
        this.props.onUserInput(this.state.text);
        return false; //don't send result to web server
    },

    onChange: function(e) {
        this.log("user input: ",e);
        this.setState({text: e.target.value});
        this.props.onUserInput(e.target.value);
    },

    render: function() {
        return (
            <form id="filterUser" onSubmit={this.handleSubmit}>
            <input type="text"
                placeholder="Filter your contacts"
                value={this.state.text}
                width="100"
                ref="url"
                onChange={this.onChange}
            />
            <button type="submit" class="fontawesome-ok"></button>
            </form>
        );
    }
});
