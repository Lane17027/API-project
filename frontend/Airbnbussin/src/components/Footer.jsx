export default function Footer() {
  return (
    <footer>
      <div className="project-github">
        <h4>Project Github:</h4>
        <h4>
          <a href="https://github.com/Lane17027/API-project">Github</a>
        </h4>
      </div>
      <hr className="divider" />
      <div className="team-container">
        <div>
          <h3>Team Members</h3>
        </div>
        <div className="team-members-container">
          <div className="team-member">
            <h4>Lane Nichols</h4>
            <h4>
              <a href="https://github.com/Lane17027">Github</a>
            </h4>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="copyright">
        <p>&copy; Airbnbussin</p>
      </div>
    </footer>
  );
}
