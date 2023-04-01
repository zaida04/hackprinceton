import { useState } from "react";

function MenuItem(props: { children: any }) {
  return <p className="border-gray-500 p-4 border-[1px]">{props.children}</p>;
}

const listOfColleges = ["college 1", "college 2", "college 3"];

export default function Colleges() {
  const [showColleges, setShowColleges] = useState(false);
  const [matchedColleges, setMatchedColleges] = useState<string[]>([]);

  return (
    <div className="flex justify-center content-center">
      <div className="relative flex-col">
        <p className="text-sm pb-1">Choose your College</p>
        <input
          onBlur={() => setShowColleges(false)}
          onFocus={() => setShowColleges(true)}
          onChange={(event) => {
            const content = event.target.value;
            if (content.trim() == "") setMatchedColleges([]);
            else {
              const matchingColleges = listOfColleges.filter((x) =>
                x.includes(content)
              );
              setMatchedColleges(matchingColleges);
            }
          }}
          className="py-3 px-4 text-gray-600 bg-white border-2 border-gray-700 rounded-lg"
          placeholder="Enter your college name"
        />
        {Boolean(showColleges || matchedColleges.length) && (
          <div className="pt-[.5px]">
            {(matchedColleges.length ? matchedColleges : listOfColleges).map(
              (x) => (
                <MenuItem key={x}>{x}</MenuItem>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
