const FieldSetCreate = ({ campo, type = "text", name,  onChange }) => {
  return (
    <fieldset className="border rounded-md p-3">
      <legend className="border rounded-md p-1 bg-green-300">{campo}</legend>
      <input type={type} name={name} className="border rounded-md w-full p-1" onChange={onChange} />
    </fieldset>
  );
};

export default FieldSetCreate;
