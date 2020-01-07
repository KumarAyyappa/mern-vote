exports.CustomError=(name,message)=>{
    this.status=404;
    this.name=name;
    this.message=message || "Nothing to be shown here";
    var error=new Error(this.message);
    error.name=this.name;
}
