interface Category {
  name: string;
}

export async function fetchWorkplaceCategories(): Promise<string[]> {
  const cachedCategories = localStorage.getItem("workplaceCategories");
  if (cachedCategories) {
    try {
      const parsed = JSON.parse(cachedCategories);
      const cacheTime = localStorage.getItem("workplaceCategoriesTimestamp");

      if (cacheTime && Date.now() - parseInt(cacheTime) < 3600000) {
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing cached categories:", e);
    }
  }

  const response = await fetch("https://dummyjson.com/products/categories");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const categories = ((await response.json()) as Category[]).map(
    ({ name }: { name: string }) => name,
  );

  localStorage.setItem("workplaceCategories", JSON.stringify(categories));
  localStorage.setItem("workplaceCategoriesTimestamp", Date.now().toString());

  return categories;
}

export async function submitLoanApplication(formData: any) {
  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${formData.firstName} ${formData.lastName}`,
        description: `Loan application for ${formData.amount}$ for ${formData.term} days`,
        price: formData.amount,
        category: formData.workplace,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting loan application:", error);
    throw error;
  }
}
