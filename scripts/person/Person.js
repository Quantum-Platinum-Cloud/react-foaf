/** @jsx React.DOM */

var Person = React.createClass({
    mixins: [WithLogger,WithLifecycleLogging],
    componentName: "Person",

    getInitialState: function() {
        return {
            modeEdit:false,
            editText:"Edit",
            personInfo:{}
        }
    },

    // TODO fixme HACK !!!
    // TODO fixme HACK !!!
    // TODO fixme HACK !!!
    // TODO fixme HACK !!!
    toPgArrayHack: function(pg) {
        return [pg];
    },

    render: function () {
        if (!this._isInitialized()) {
            return (
                <div id="profile" className="clearfix center">
                    <span>Loading...</span>
                </div>
                );
        }
        else {
            this.debug("Rendering person")
            var personPG = this.toPgArrayHack(this.props.personPG); // TODO remove when possible
            // Set user name.
            var userName = foafUtils.getName(personPG);

            //basicInfo={this._getBasicInfo()}
            return (
                <div id="profile" className="clearfix center">
                    <div className="edit-profile" onClick={this._handleClickEdit}>{this.state.editText}</div>
                    <Pix src={this._getUserImg()}/>
                    <PersonBasicInfo
                        modeEdit={this.state.modeEdit}
                        personPG={personPG}
                        submitEdition={this._submitEdition}
                        updatePersonInfo={this._updatePersonInfo}/>
                    <PersonNotifications notifications={this._getNotifications}/>
                    <PersonMessage userName={userName} lastMessage={this._getMessage()}/>
                    <PersonMoreInfo
                        modeEdit={this.state.modeEdit}
                        moreInfo={this._getMoreInfo()}
                        submitEdition={this._submitEdition}
                        updatePersonInfo={this._updatePersonInfo}
                        personPG={personPG}
                        address={this._getAddress()}/>
                    <PersonWebId getWebId={this._getWebId}/>
                </div>
                );
        }
    },

    _isInitialized: function() {
        return this.props.personPG
    },

    _handleClickEdit: function(e) {
        this.log('_handleClickEdit');
        this.log(this.state.personInfo);

        if (this.state.modeEdit) {
            this._submitEdition(this.state.personInfo);
        }
        else {
            this.setState({
                modeEdit:true,
                editText:"save",
                personInfo:{}
            });
        }
    },

    _submitEdition: function() {
        this.log('_submitEdition');
        this.log(this.state.personInfo);

        // Submit changes.
        this.props.submitEdition(this.state.personInfo);

        // Cancel Edit mode.
        this.setState({
            modeEdit:false,
            editText:"edit",
            personInfo:{}
        });

        // And return false.
        return false;
    },

    _updatePersonInfo: function(id, newValue, oldValue) {
        this.log('update person info')
        this.state.personInfo[id]=[newValue, oldValue];
        this.log(this.state.personInfo)
    },

    _getUserImg: function() {
        var personPG = this.toPgArrayHack(this.props.personPG); // TODO remove when possible
        var imgUrlList = foafUtils.getImg(personPG);
        return (imgUrlList && imgUrlList.length>0)? imgUrlList[0]:"img/avatar.png";
    },

    /*
    _getBasicInfo: function() {
        var personPG = this.toPgArrayHack(this.props.personPG); // TODO remove when possible
        var nameList=foafUtils.getName(personPG);
        var givenNameList=foafUtils.getGivenName(personPG);
        var familyNameList=foafUtils.getFamilyName(personPG);
        var firstNameList=foafUtils.getFirstName(personPG);
        var workPlaceHomepageList = foafUtils.getworkplaceHomepage(personPG);

        return {
            "foaf:name": nameList,
            "foaf:givenname": givenNameList,
            "foaf:lastname": familyNameList,
            "foaf:firstname": firstNameList,
            "foaf:workPlaceHomepage": workPlaceHomepageList
        }
    },*/

    _getAddress: function(){
        var personPG = this.toPgArrayHack(this.props.personPG); // TODO remove when possible
        this.log("**************************************************************************")
        this.log(personPG);

        var streetList = foafUtils.getContactStreet(personPG);
        var postalCodeList = foafUtils.getContactPostalCode(personPG);
        var cityList = foafUtils.getContactCity(personPG);
        var countryList = foafUtils.getContactCountry(personPG);

        return {
            "contact:street": streetList,
            "contact:postalCode": postalCodeList,
            "contact:city": cityList,
            "contact:country": countryList
        }
    },

    _getNotifications: function() {
        return {
            nbNewMessages:0,
            nbRecentInteraction:0,
            nbUpdates:0
        }
    },

    _getMessage: function() {
        var noValue = "";
        return {
            lastMessageDate:noValue,
            lastMessage:"No message"
        }
    },

    _getMoreInfo: function() {
        var personPG = this.toPgArrayHack(this.props.personPG); // TODO remove when possible
        var emailList = foafUtils.getEmails(personPG);
        var phoneList = foafUtils.getPhones(personPG);
        var homepageList = foafUtils.getHomepages(personPG);

        // Return.
        var moreInfo = {
            "foaf:mbox":emailList,
            "foaf:phone":phoneList,
            "foaf:homepage":homepageList
        };
        return moreInfo;
    },

    _getWebId: function() {
        var value = this.props.personPG.pointer.value;
        return {
            webId:value
        };
    }

});