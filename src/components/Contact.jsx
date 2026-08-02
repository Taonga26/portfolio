import SectionTitle from "./SectionTitle";

function Contact() {
    return(
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
            <SectionTitle
            title="Get In Touch"
            subtitle="Let's build something amazing together"
            />

            <form action="#" className="space-y-6">
                <input type="email" placeholder="Email Address" className="w-full rounded-xl p-4 outline-none"/>
                <textarea rows="6" placeholder="Message" className="w-full  rounded-xl p-4 outline-none"></textarea>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl">
                    Send Message
                </button>
            </form>
        </section>
    );
}

export default Contact;