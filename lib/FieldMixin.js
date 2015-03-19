function merge() {
  var ret = {};
  var args = [].slice.call(arguments, 0);
  args.forEach((a)=> {
    Object.keys(a).forEach((k)=> {
      ret[k] = a[k];
    });
  });
  return ret;
}

var FieldMixin = {
  setField(field, e) {
    var v = e;
    if (e && e.target) {
      v = e.target.value;
    }
    var newFormData = {};
    newFormData[field] = v;
    this.setState({
      formData: merge(this.state.formData, newFormData)
    });
  },

  handleValidate(status, formData) {
    this.setState({
      status: status,
      formData: formData
    });
  }
};

module.exports = FieldMixin;
