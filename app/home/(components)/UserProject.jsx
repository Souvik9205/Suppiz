const UserProject = ({ projects }) => {
  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project, index) => (
          <div className="">
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500">
                  Tier: {project.tier}
                </span>
                <span className="text-sm font-medium text-gray-500 ml-2">
                  Status: {project.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Created at: {new Date(project.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProject;
