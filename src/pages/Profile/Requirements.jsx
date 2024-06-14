/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

const LabelInfomation = (props) => {
  const { title, desc } = props;
  return (
    <li className="my-1">
      <span className="font-medium mr-1 bg-gray-600 text-white p-1 rounded-sm inline-block">
        {title}
      </span>
      <span className="text-wrap">{desc}</span>
    </li>
  );
};

const Requirements = ({ type }) => {
  if (type === "password") {
    return (
      <div className="my-5">
        <h2 className="font-semibold">Password requirements:</h2>
        <p className="my-2">Ensure that these requirements are met:</p>
        <ul className="text-[14px] pl-4 flex flex-col gap-2">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
          <li>Some text here zoltan</li>
        </ul>
      </div>
    );
  }
  if (type === "information") {
    return (
      <div className="my-6">
        <h2 className="font-semibold">Information requirements:</h2>
        <p className="my-2 mb-3">Ensure that these requirements are met:</p>
        <ul className="text-[14px] pl-4 flex flex-col gap-3">
          <LabelInfomation
            title="First Name:"
            desc="At least 2
            characters (and up to 8 characters)"
          />
          <LabelInfomation
            title="Last Name:"
            desc="At least 2
            characters (and up to 8 characters)"
          />
          <LabelInfomation
            title="Location:"
            desc="At least 4
            characters (and up to 30 characters)"
          />
          <LabelInfomation
            title="Description:"
            desc="At least 3
            characters (and up to 30 characters per type)"
          />
          <LabelInfomation
            type="profession"
            title="Profession:"
            desc={`Every time you enter: At least 3 characters (and up to 20 characters per type), ${"\n"}There are no more than 5 profession item`}
          />
        </ul>
      </div>
    );
  }

  return <div></div>;
};

export default Requirements;
