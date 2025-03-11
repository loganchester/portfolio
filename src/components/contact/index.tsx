import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ContactForm from "./form";

const Contact = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className="dark:bg-purple">
      <CardHeader></CardHeader>
      <CardContent>
        <ContactForm className={className} {...props} />
      </CardContent>
    </Card>
  );
};

export default Contact;
