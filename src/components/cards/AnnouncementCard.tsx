const AnnouncementCard = ({
  announcements,
}: {
  announcements: {
    id: number;
    title: string;
    description: string;
    date: Date;
    classId: number | null;
  }[];
}) => {
  return announcements.map((announcement) => (
    <div className="bg-lamaSkyLight rounded-md p-4" key={announcement.id}>
      <div className="flex items-center justify-between">
        <h2 className="font-medium">{announcement.title}</h2>
        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
          {new Intl.DateTimeFormat("en-US").format(announcement.date)}
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
    </div>
  ));
};
export default AnnouncementCard;
