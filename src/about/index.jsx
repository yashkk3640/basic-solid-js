import { useUserContext } from "../context/UserContext";

const About = () => {
  const { username, role } = useUserContext();
  console.log(username, role);
  return (
    <div>
      <div class="fs-2 fw-bold">About</div>
      <div class="d-flex text-center justify-content-center">
        <div class="me-2">UserName:</div>
        {username()}
      </div>
      <div class="d-flex text-center justify-content-center">
        <div class="me-2">Role:</div>
        {role()}
      </div>
    </div>
  );
};

export default About;
