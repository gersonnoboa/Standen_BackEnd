class DisplayTeamGroup {
    constructor(id, name) {
        this.name = name;
        this.id = id;
        this.teams = [];
    }
}

class DisplayTeamGroups {
    constructor() {
        this.groups = [];
    }

    addTeamToGroup(team, group) {
        let found = this.groups.find(element => {
            return element.name == group.name;
        });

        var group;
        if (found == undefined) {
            group = new DisplayTeamGroup(group.id, group.name);
            this.groups.push(group);
        } else {
            group = found;
        }
        
        team.teamGroup = undefined;
        team.tournament = undefined;
        group.teams.push(team);
    }
}

module.exports = DisplayTeamGroups;