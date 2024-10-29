import { selector } from "recoil";
import { groupingOptionAtom } from "./groupingOptionAtom";
import { sortingOptionAtom } from "./sortingOptionAtom";
import { ticketsAtom } from "./ticketAtom";
import { usersAtom } from "./usersAtom";

const sortTickets = (tickets, sortingOption) => {
  return tickets.sort((a, b) => {
    if (sortingOption === "priority") {
      return b.priority - a.priority;
    } else if (sortingOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
};

const priorityLevels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

export const groupedTicketsSelector = selector({
  key: "groupedTicketsSelector",
  get: ({ get }) => {
    const tickets = get(ticketsAtom);
    const users = get(usersAtom);
    const groupingOption = get(groupingOptionAtom);
    const sortingOption = get(sortingOptionAtom);

    if (!Array.isArray(tickets)) return {};

    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user.name;
    });

    const groupedTickets = tickets.reduce((groups, ticket) => {
      let groupKey;
      if (groupingOption === "user") {
        groupKey = userMap[ticket.userId] || "Unknown User";
      } 
      else if (groupingOption === "priority") {
        groupKey = priorityLevels[ticket.priority] || "No priority";
      } 
      else if (groupingOption === "status") {
        groupKey = ticket.status || "To Do";
      } 
      else {
        groupKey = ticket[groupingOption];
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(ticket);
      return groups;
    }, {});

    if (groupingOption === "status") {
      if (!groupedTickets["Done"]) groupedTickets["Done"] = [];
      if (!groupedTickets["Canceled"]) groupedTickets["Canceled"] = [];
    }

    Object.keys(groupedTickets).forEach((groupKey) => {
      groupedTickets[groupKey] = sortTickets(
        groupedTickets[groupKey],
        sortingOption
      );
    });

    return groupedTickets;
  },
});
