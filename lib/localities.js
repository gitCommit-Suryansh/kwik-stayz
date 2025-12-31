export async function fetchLocalitiesByCity(citySlug) {
    const localities = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/localities/${citySlug}`,
        { cache: "no-store" }
      );
    if (!localities.ok) return null;
    return localities.json();
}