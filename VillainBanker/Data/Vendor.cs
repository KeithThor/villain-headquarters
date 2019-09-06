using System.ComponentModel.DataAnnotations;

namespace VillainBanker.Data
{
    /// <summary>
    /// Represents a data object for Vendor data.
    /// </summary>
    public class Vendor
    {
        /// <summary>
        /// The string Id that represents this unique Vendor.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The string secret used to verify this Vendor.
        /// </summary>
        [Required]
        public string Secret { get; set; }

        /// <summary>
        /// The name of the Vendor.
        /// </summary>
        [Required]
        public string Name { get; set; }
    }
}
