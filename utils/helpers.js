module.exports = {
    // Helper metoda za formatiranje vremena
    format_time: (date) => {
      if (!date) return "Nepoznato vrijeme";
      try {
        const validDate = new Date(date);
        if (isNaN(validDate)) return "Nevažeći datum";
        return validDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
      } catch (error) {
        return "Greška u formatu datuma";
      }
    },
  
    // Skraćivanje sadržaja blog posta
    format_summary: (content) => {
      if (content && content.length > 300) {
        return content.substring(0, 300) + "...";
      }
      return content || "";
    },
  
    // Dodavanje formatDate helpera
    formatDate: (date) => {
      if (!date) return "";
      const d = new Date(date);
      if (isNaN(d)) return "Nevažeći datum";
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  
    // Univerzalna funkcija za sigurno skraćivanje teksta
    truncate: (str, len) => {
      if (typeof str !== "string" || !str) return "";
      return str.length > len ? str.substring(0, len) + "..." : str;
    },

    eq: (a, b) => a === b,
    or: (a, b) => a || b
  };
  