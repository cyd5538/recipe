interface Props {
  email: string;
  createdAt: string ;
}

export const UserProfileInfo: React.FC<Props> = ({ email, createdAt }) => (
  <div className="text-sm text-gray-500 space-y-1">
    <div>{email}</div>
    <div>가입일: {new Date(createdAt).toLocaleDateString()}</div>
  </div>
);