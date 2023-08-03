import axios from "axios";
import { createResource, createSignal } from "solid-js";

const DJANGO_SERVER = "http://localhost:8000/";

const Contact = () => {
  const [newTeam, setNewTeam] = createSignal({
    title: "My Team",
    description: "My First Team",
    no_of_members: 1,
    creator: "yash",
    tempOf: "cricket",
  });

  const getTeams = () =>
    axios(DJANGO_SERVER + "playground/teams", {
      method: "get",
      // mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // Origin: "http://localhost:3000",
        // Referer: "http://localhost:3000/",
      },
    }).then((res) => res.data);

  const createTeams = () =>
    axios
      .post(DJANGO_SERVER + "playground/create", newTeam())
      .then((res) => res.data)
      .then((data) => console.log(data));

  const [data, { mutate, refetch }] = createResource(getTeams);

  fetch("http://localhost:8000/playground/teams", {
    method: "get",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      // Origin: "http://localhost:3000",
      // Referer: "http://localhost:3000/",
    },
  })
    .then((r) => console.log({ data: r.data }))
    .catch((e) => console.log({ e }));

  console.log(data());
  return (
    <div>
      <div class="fs-2 fw-medium">Contact</div>
      <div class="mx-3 py-2 text-center border border-secondary-subtle">
        {newTeam() && (
          <div class="row justify-content-center col-7 mx-auto">
            <div class="col-6">
              <label class="w-25 text-end px-2">Title</label>
              <input
                value={newTeam().title || ""}
                onChange={(e) =>
                  setNewTeam((em) => ({ ...em, title: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Description</label>
              <input
                value={newTeam().description || ""}
                onChange={(e) =>
                  setNewTeam((em) => ({ ...em, description: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">No. Members</label>
              <input
                value={newTeam().no_of_members || ""}
                onChange={(e) =>
                  setNewTeam((em) => ({ ...em, no_of_members: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Creator</label>
              <input
                value={newTeam().creator || ""}
                onChange={(e) =>
                  setNewTeam((em) => ({ ...em, creator: e.target.value }))
                }
              />
            </div>
            <div class="col-6">
              <label class="w-25 text-end px-2">Team of</label>
              <input
                value={newTeam().tempOf || ""}
                onChange={(e) =>
                  setNewTeam((em) => ({ ...em, tempOf: e.target.value }))
                }
              />
            </div>
            <div class="col-3 mt-3 text-center">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  // mutate([...data(), newTeam()]);
                  // setNewTeam({});
                  createTeams();
                }}
              >
                Add Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
