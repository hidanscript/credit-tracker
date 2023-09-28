import { Signal, useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const amountInput = useSignal("");
  let formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
 }
 let dollarString = new Intl.NumberFormat( 'en-US', formatting_options );
 const formatString = ( number: Signal ): string => {
  return dollarString.format(number.value);
 }

 const alterCredit = (): void => {
  const amount = parseFloat(amountInput.value);
  props.count.value += amount;
 }

  return (
    <div class="flex flex-col items-center gap-8 py-6">
      <p class="text-3xl">{formatString(props.count)}</p>
      <Input type="number" value={amountInput.value} onChange={(event: any) => { amountInput.value = event.target.value }}/>
      <Button onClick={alterCredit}>Submit</Button>
    </div>
  );
}
