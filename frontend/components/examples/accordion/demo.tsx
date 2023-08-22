import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Should I give Ryan & Isaac a chance?</AccordionTrigger>
        <AccordionContent>
          Yes. 
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does this platform support NFC?</AccordionTrigger>
        <AccordionContent>
          Yes, 5G + IR + walletpay = O.P.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does it cost me anything?</AccordionTrigger>
        <AccordionContent>
          No.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
