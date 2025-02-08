export default function SendMessage() {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Send a Message</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-lg" />
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-lg" />
          <textarea placeholder="Your Message" className="w-full p-2 border rounded-lg h-28"></textarea>
          <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Send</button>
        </form>
      </div>
    );
  }
  