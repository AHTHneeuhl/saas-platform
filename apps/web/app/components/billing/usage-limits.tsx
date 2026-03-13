type Props = {
  projects: number;
  projectLimit: number;
  members: number;
  memberLimit: number;
};

export function UsageLimits({
  projects,
  projectLimit,
  members,
  memberLimit,
}: Props) {
  return (
    <div className="border rounded p-4 space-y-2">
      <div>
        <p className="text-sm text-gray-500">Projects</p>
        <p>
          {projects} / {projectLimit}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Members</p>
        <p>
          {members} / {memberLimit}
        </p>
      </div>
    </div>
  );
}
