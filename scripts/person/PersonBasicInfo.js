/** @jsx React.DOM */

var PersonBasicInfo = React.createClass({
    mixins: [WithLogger,WithLifecycleLogging],
    componentName: "PersonBasicInfo",

    getInitialState: function() {
        return {
            "foaf:name": this.props.basicInfo["foaf:name"],
            "foaf:givenname": this.props.basicInfo["foaf:givenname"],
            "foaf:workPlaceHomepage": this.props.basicInfo["foaf:workPlaceHomepage"]
        }
    },

    render: function() {
        // Get info.
        var info = this._getPersonInfo();

        // Define Html.
        var viewTree =
            <div className="basic">
                <div className="name title-case">{info["foaf:name"]}</div>
                <div className="surname title-case">{info["foaf:givenname"]}</div>
                <div className="company">{info["foaf:workPlaceHomepage"]}</div>
            </div>

        var viewTreeEdit =
            <div className="basic">
                <div className="name title-case">
                    <form onSubmit={this._handleSubmit}>
                        <input id="foaf:name"
                        type="text"
                        defaultValue={info["foaf:name"]}
                        onChange={this._onChange}
                        />
                    </form>
                </div>
                <div className="surname title-case">
                    <form onSubmit={this._handleSubmit}>
                        <input id="foaf:givenname"
                        type="text"
                        defaultValue={info["foaf:givenname"]}
                        onChange={this._onChange}
                        />
                    </form>
                </div>
                <div className="company">
                    <form onSubmit={this._handleSubmit}>
                        <input id="foaf:workPlaceHomepage"
                        type="text"
                        defaultValue={info["foaf:workPlaceHomepage"]}
                        onChange={this._onChange}
                        />
                    </form>
                </div>
            </div>

        // Return depending on the mode.
        return (this.props.modeEdit)? viewTreeEdit: viewTree;
    },

    /*
    *  Start our own functions here.
    * */

    _handleSubmit: function(e) {
        e.preventDefault();
        this.props.submitEdition();
    },

    _onChange: function(e) {
        var id = e.target.id;
        var oldValue = this.props.basicInfo[id][0];
        var newValue = e.target.value;
        this.props.updatePersonInfo(id, newValue, oldValue);
        this._infoMap[id](e.target.value, this);
    },

    _getPersonInfo: function() {
        var noValue = "...";
        return {
            "foaf:name": (this.state["foaf:name"] && this.state["foaf:name"].length>0)? this.state["foaf:name"][0]:noValue,
            "foaf:givenname": (this.state["foaf:givenname"] && this.state["foaf:givenname"].length>0)? this.state["foaf:givenname"][0]:noValue,
            "foaf:workPlaceHomepage": (this.state["foaf:workPlaceHomepage"] && this.state["foaf:workPlaceHomepage"].length>0)? this.state["foaf:workPlaceHomepage"][0]:noValue
        }
    },

    _infoMap: {
        "foaf:name": function(value, ref) {
            ref.state["foaf:name"][0] = value;
            return ref.setState({"foaf:name": ref.state["foaf:name"]});
        },
        "foaf:givenname": function(value, ref) {
            ref.state["foaf:givenname"][0] = value;
            return ref.setState({"foaf:givenname": ref.state["foaf:givenname"]});
        },
        "foaf:workPlaceHomepage": function(value, ref) {
            ref.state["foaf:workPlaceHomepage"][0] = value;
            return ref.setState({"foaf:workPlaceHomepage": ref.state["foaf:workPlaceHomepage"]});
        }
    }
});