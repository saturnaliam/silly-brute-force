import { parse } from "https://deno.land/std@0.192.0/flags/mod.ts";

const generate = (loops: number) => {
  console.time("elapsed")
  loops = loops - 1;

  const sub_gen = (loops: number): string[] => {
    const symbols =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    const gen = [];
    for (let i = 0; i < symbols.length; i++) {
      gen.push(symbols[i]);

      if (loops) {
        const sub_gens = sub_gen(loops - 1);
        gen.pop();
        for (let x = 0; x < sub_gens.length; x++) {
          gen.push(symbols[i]);
          gen[gen.length - 1] += sub_gens[x];
        }
      }
    }

    return gen;
  };

  const gen = sub_gen(loops);
  let print_message = "";
  for (let i = 0; i < gen.length; i++) {
    print_message += gen[i] + "\n";
  }

  console.log(print_message);
  console.timeEnd("elapsed")
};

if (parse(Deno.args)["l"]) generate(parse(Deno.args)["l"]);
