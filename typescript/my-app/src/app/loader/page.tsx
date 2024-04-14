export default async function () {
  await new Promise((r) => setTimeout(r, 5000));

  return <div>Loader Screen</div>;
}
