function merge() {
  const ret = {};
  const args = [].slice.call(arguments, 0);
  args.forEach((a)=> {
    Object.keys(a).forEach((k)=> {
      ret[k] = a[k];
    });
  });
  return ret;
}

const FieldMixin = {
  setField(field, e) {
    let v = e;
    if (e && e.target) {
      v = e.target.value;
    }
    const newFormData = {};
    newFormData[field] = v;
    this.setState({
      formData: merge(this.state.formData, newFormData),
    });
  },

  handleValidate(status, formData) {
    this.onValidate(status, formData);
  },

  onValidate(status, formData) {
    this.setState({
      status: merge(this.state.status, status),
      formData: merge(this.state.formData, formData),
    });
  },
};

export default FieldMixin;
