import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { groupingOptionAtom } from "../../state/groupingOptionAtom";
import { sortingOptionAtom } from "../../state/sortingOptionAtom";
import "./FilterMenu.css";

const FilterMenu = ({ onOptionSelect }) => {
  const [groupingOption, setGroupingOption] = useRecoilState(groupingOptionAtom);
  const [sortingOption, setSortingOption] = useRecoilState(sortingOptionAtom);

  useEffect(() => {
    const savedGroupingOption = localStorage.getItem("groupingOption");
    const savedSortingOption = localStorage.getItem("sortingOption");

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }
  }, [setGroupingOption, setSortingOption]);

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGroupingOption(newGrouping);
    localStorage.setItem("groupingOption", newGrouping);
    onOptionSelect();
  };

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSortingOption(newSorting);
    localStorage.setItem("sortingOption", newSorting);
    onOptionSelect();
  };

  return (
    <div className="filter-menu">
      <label>
        Grouping
        <select value={groupingOption} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>

      <label>
        Ordering
        <select value={sortingOption} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default FilterMenu;