// username
// password
// expiry_date
// hobby
// join_date
// age
import axios from "axios";
import { createResource, createSignal } from "solid-js";
import { REST_SERVER } from "../constants";

const GridContainer = () => {
  const [newEmpInfo, setNewEmpInfo] = createSignal({});
  const getEmployees = () =>
    axios.get(REST_SERVER + "employees").then((res) => res.data);

  const [data, { mutate, refetch }] = createResource(getEmployees);

  console.log({ data: data.loading, mutate, refetch });

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
            <th scope="col" class="cursor-pointer">
              Username
            </th>
            <th scope="col">Password</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Hobby</th>
            <th scope="col">Join Date</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {data()?.map((d) => (
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
