const FieldSetEdit = ({ campo, type = "text", name, value, onChange }) => {
  return (
    <fieldset className="border rounded-md p-3">
      <legend className="border rounded-md p-1 bg-amber-100">{campo}</legend>
      <input type={type} name={name} className="border rounded-md w-full p-1" value={value} onChange={onChange} />
    </fieldset>
  );
};

export default FieldSetEdit;
