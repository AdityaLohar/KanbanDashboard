import { useRecoilValue } from "recoil";
import { groupedTicketsSelector } from "../../state/selectors";
import { groupingOptionAtom } from "../../state/groupingOptionAtom";
import { usersAtom } from "../../state/usersAtom";
import "./KanbadBoard.css";

// Icons
import addIcon from "../../assets/add.svg";
import dotmenuIcon from "../../assets/3-dot-menu.svg";
import progressIcon from "../../assets/in-progress.svg";
import priorityIcon from "../../assets/no-priority.svg";
import doneIcon from "../../assets/Done.svg";
import canceledIcon from "../../assets/cancelled.svg";
import todoIcon from "../../assets/todo.svg";
import backlogIcon from "../../assets/Backlog.svg";
import urgentIcon from "../../assets/urgent.svg";
import urgentDarkIcon from "../../assets/urgent-dark.svg";
import highIcon from "../../assets/high.svg";
import mediumIcon from "../../assets/medium.svg";
import lowIcon from "../../assets/low.svg";

const priorityLevels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const groupIcons = {
  "In progress": progressIcon,
  Todo: todoIcon,
  Backlog: backlogIcon,
  Done: doneIcon,
  "Canceled": canceledIcon,
  Urgent: urgentIcon,
  "Urgent dark": urgentDarkIcon,
  High: highIcon,
  Medium: mediumIcon,
  Low: lowIcon,
  "No priority": priorityIcon,
};

const colors = [
  "rgb(102, 178, 255)",
  "rgb(51, 153, 255)",
  "#107C10",
  "#10893E",
  "#585A58",
  "#68768a",
  "rgb(255, 102, 102)",
  "rgb(255, 80, 80)",
];

const KanbanBoard = () => {
  const groupedTickets = useRecoilValue(groupedTicketsSelector);
  const groupingOption = useRecoilValue(groupingOptionAtom);
  const users = useRecoilValue(usersAtom);

  const getUserInitials = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user && user.name) {
      const nameParts = user.name.split(" ");
      if (nameParts.length === 1) {
        return nameParts[0].slice(0, 2).toUpperCase();
      } else {
        const [firstName, lastName] = nameParts;
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
      }
    }
    return "US";
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="entries-container">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="entry">
          <div className="topbar">
            <div className="topbar-left">
              {groupIcons[groupKey] ? (
                <img src={groupIcons[groupKey]} alt="" />
              ) : (
                <p className="topbar-placeholder"
                style={{ backgroundColor: getRandomColor() }} 
                >
                  {groupKey.split(" ").length === 1
                    ? groupKey.slice(0, 2).toUpperCase()
                    : `${groupKey.split(" ")[0][0]}${
                        groupKey.split(" ")[1][0]
                      }`.toUpperCase()}
                </p>
              )}

              <p>{groupKey}</p>
              <p className="group-count">{groupedTickets[groupKey].length}</p>
            </div>
            <div>
              <img src={addIcon} alt="" />
              <img src={dotmenuIcon} alt="" />
            </div>
          </div>

          {groupedTickets[groupKey].map((ticket) => (
            <div key={ticket.id} className="card">
              <div className="card-top">
                <p id="para-title">{ticket.id}</p>
                {groupingOption.toLowerCase() !== "user" && (
                  // marking this for optimization later
                  <div
                    className="profile"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {getUserInitials(ticket.userId)}
                  </div>
                )}
              </div>

              <div className="card-center">
                {groupingOption.toLowerCase() !== "status" && (
                  <img src={groupIcons[ticket.status]} alt="" />
                )}
                <p>{ticket.title}</p>
              </div>

              <div className="card-bottom">
                {groupingOption.toLowerCase() !== "priority" && (
                  <div>
                    <img
                      src={
                        ticket.priority === 4
                          ? groupIcons["Urgent dark"]
                          : groupIcons[priorityLevels[ticket.priority]]
                      }
                      alt=""
                    />{" "}
                  </div>
                )}

                <div className="tags">
                  <div className="tag-container">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Location_dot_grey.svg"
                      alt=""
                    />
                  </div>
                  <p>{ticket.tag[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
