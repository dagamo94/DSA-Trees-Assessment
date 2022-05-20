const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId; // KEY
    this.officerName = officerName; // VALUE
    this.reportTo = reportTo; // the officer that the new officer reports to (PARENT)
    this.leftReport = null; // LEFT EDGE
    this.rightReport = null; // RIGHT EDGE
  }

  assignOfficer(officerId, officerName) {
    // your solution here
    if(this.officerId === null){
      this.officerId = officerId;
      this.officerName = officerName;
    }else if(officerId < this.officerId){
      if(this.leftReport == null){
        this.leftReport = new StarshipEnterprise(officerId, officerName, this);
      }else{
        this.leftReport.assignOfficer(officerId, officerName);
      }
    }else{
      if(this.rightReport == null){
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      }
      else{
        this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }
  
  
  // Return an array of the leaves of the tree
  findOfficersWithNoDirectReports(values = []) {
    // your solution here
    if(!this.leftReport && !this.rightReport){
      values.push(this.officerName);
    }
    
    if(this.leftReport){
      values = this.leftReport.findOfficersWithNoDirectReports(values);
    }
    
    if(this.rightReport){
      values = this.rightReport.findOfficersWithNoDirectReports(values);
    }
    
    return values;
  }
  
  // DFS - In-Order REVERSED
  listOfficersByExperience(officerNames = []) {
    // your solution here
    if(this.rightReport){
      officerNames = this.rightReport.listOfficersByExperience(officerNames);
    }
    
    officerNames.push(this.officerName);
    
    if(this.leftReport){
      officerNames = this.leftReport.listOfficersByExperience(officerNames);
    }
        
    return officerNames;
  }

  
  _getDepth(depth = 1) {
    if (!this.reportTo) return depth;
    return this.reportTo._getDepth(depth + 1);
  }
  
  // BFS - Breadth-First-Search
  listOfficersByRank(tree, rankedOfficers = {}) {
    // your solution here
    const queue = new Queue();
    queue.enqueue(tree);
    
    let node = queue.dequeue();
    
    while(node){
      let currDepth = node._getDepth();
      
      if(!rankedOfficers[currDepth]){
        rankedOfficers[currDepth] = []
      }
      
      rankedOfficers[currDepth].push(node.officerName);
      if(node.leftReport){
        queue.enqueue(node.leftReport);
      }
      if(node.rightReport){
        queue.enqueue(node.rightReport);
      }
      
      node = queue.dequeue();
    }
    
    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;
