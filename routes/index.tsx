import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const weeklyCredit = useSignal(50000);
  return (
    <div class="px-4 py-8 mx-auto my-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-lg">Credit Tracker</h1>
        <Counter count={weeklyCredit} />
      </div>
    </div>
  );
}
