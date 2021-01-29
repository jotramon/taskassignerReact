import React from "react";
import TextField from "@material-ui/core/TextField";
import Fuse from "fuse.js";
import useDebounce from "./usedebounce";
import "../style/datagrid.css";
import "../style/massiveactions.css";

export default function MasssiveActions(props: any) {
  const { tasks, list, setList } = props;

  const [pattern, setPattern] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(event.target.value);
  };

  const debouncedSearchTerm = useDebounce(pattern, 500);

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["user", "form", "place"],
  };
  const fuse = new Fuse(tasks, options);

  React.useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm && pattern.length >= 3) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        // searchCharacters(debouncedSearchTerm).then(results => {
        //   // Set back to false since request finished
        //   setIsSearching(false);
        //   // Set results state
        //   setResults(results);
        // });
        const valueFuse = fuse.search(pattern);
        const result = valueFuse.map((a) => a.item);
        setIsSearching(false);
        setList(result);
      } else {
        if (pattern !== "" && pattern.length >= 3) {
          setList(list);
        } else {
          setList(tasks);
        }
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  return (
    <div className={"search"}>
      <TextField
        id="outlined-basic"
        label="Buscar por usuario, formulario o lugar..."
        variant="outlined"
        size={"small"}
        className={"input-buscador"}
        onChange={handleChange}
      />
    </div>
  );
}
