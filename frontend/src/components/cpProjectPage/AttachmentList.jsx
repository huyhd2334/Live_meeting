
const AttachmentList = ({ attachments }) => {
  if (!attachments.length) return null

  return (
    <div className="ml-6 mt-2 text-sm text-purple-600">
      <b>Attachments:</b>
      {attachments.map(a => (
        <div key={a.attachment_id}>
          📎 {a.file_url}
        </div>
      ))}
    </div>
  )
}

export default AttachmentList