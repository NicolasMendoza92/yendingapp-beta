
type StatusBadgeProps = {
  isCreator: boolean;
};

const StatusBadge = ({ isCreator }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
        isCreator ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {isCreator? 'Creator' : 'Participant'}
    </span>
  );
};

export default StatusBadge;
