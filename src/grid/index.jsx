// username
// password
// expiry_date
// hobby
// join_date
// age
import axios from "axios";
import { createMemo, createResource, createSignal } from "solid-js";
import { REST_SERVER } from "../constants";

const INIT_DATA = [
  {
    username: "yash",
    password: "12",
    expiry_date: "31-12-2039",
    hobby: "chess,cricket",
    join_date: "01-11-2012",
    age: 20,
  },
  {
    username: "admin",
    password: "222",
    expiry_date: "01-12-2029",
    join_date: "01-11-2010",
  },
  { username: "foo", password: "foo", expiry_date: "12-03-2023" },
];
const GridContainer = () => {
  const [newEmpInfo, setNewEmpInfo] = createSignal({});
  const [sort, setSort] = createSignal({ sortBy: "", isAsc: true });
  const getEmployees = () =>
    axios.get(REST_SERVER + "employees").then((res) => res.data);

  const [data, { mutate, refetch }] = createResource(getEmployees);

  console.log({ data: data.loading, mutate, refetch });

  const sortedData = createMemo(() => {
    const { sortBy, order } = sort();
    if (!sortBy.trim()) {
      console.log("if", { sortBy, order });
      return data() || INIT_DATA;
    } else {
      console.log("else", { sortBy, order });
      const multiplier = order === "asc" ? 1 : -1;
      return (data() || INIT_DATA).sort(
        (d1, d2) => d1[sortBy].localeCompare(d2[sortBy]) * multiplier
      );
    }
  });

  return (
    <div>
      <div class="fs-2 fw-medium">Employees</div>
      <div class="mx-3 py-2 text-center border border-secondary-subtle">
        {newEmpInfo() && (
          <div class="row justify-content-center col-7 mx-auto">
            <div class="col-6">
              <label class="w-25 text-end px-2">Username</label>
              <input
                value={newEmpInfo().username || ""}
                onChange={(e) =>
                  setNewEmpInfo((em) => ({ ...em, username: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Password</label>
              <input
                value={newEmpInfo().password || ""}
                onChange={(e) =>
                  setNewEmpInfo((em) => ({ ...em, password: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Age</label>
              <input
                value={newEmpInfo().age || ""}
                onChange={(e) =>
                  setNewEmpInfo((em) => ({ ...em, age: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Hobby</label>
              <input
                value={newEmpInfo().hobby || ""}
                onChange={(e) =>
                  setNewEmpInfo((em) => ({ ...em, hobby: e.target.value }))
                }
              />
            </div>
            <div class="col-3 mt-3 text-center">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  mutate([...data(), newEmpInfo()]);
                  setNewEmpInfo({});
                }}
              >
                Add Employee
              </button>
            </div>
          </div>
        )}
      </div>
      <table class="my-2 table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th
              scope="col"
              class="cursor-pointer"
              onClick={() => {
                console.log(sort());
                setSort((s) => ({
                  sortBy: "username",
                  order: s.sortBy === "username" ? "desc" : "asc",
                }));
                // mutate([
                //   ...data().sort((d1, d2) =>
                //     d1.password.localeCompare(d2.password)
                //   ),
                // ]);
              }}
            >
              Username
            </th>
            <th
              scope="col"
              onClick={() => {
                setSort((s) => ({
                  sortBy: "password",
                  order: s.sortBy === "password" ? "desc" : "asc",
                }));
                // mutate([
                //   ...data().sort((d1, d2) =>
                //     d1.password.localeCompare(d2.password)
                //   ),
                // ]);
              }}
            >
              Password
            </th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Hobby</th>
            <th scope="col">Join Date</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedData()?.map((d) => (
            <tr>
              <td scope="row">{d.username}</td>
              <td scope="row">{d.password}</td>
              <td scope="row">{d.expiry_date}</td>
              <td scope="row">
                {d.hobby?.split(",").map((h) => (
                  <span class="bg-danger-subtle rounded m-1 px-2">{h}</span>
                ))}
              </td>
              <td scope="row">{d.join_date}</td>
              <td scope="row">{d.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {data().map((d) => d.name)} */}
    </div>
  );
};

export default GridContainer;
