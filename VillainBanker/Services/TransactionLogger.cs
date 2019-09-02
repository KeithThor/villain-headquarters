using System.Threading.Tasks;
using VillainBanker.Services.Interfaces;

namespace VillainBanker.Services
{
    /// <summary>
    /// Basic implementation of the ITransactionLogger interface that logs transactions to the
    /// database.
    /// </summary>
    public class TransactionLogger: ITransactionLogger
    {
        public void Log(string message)
        {

        }

        public Task LogAsync(string message)
        {
            throw new System.NotImplementedException();
        }
    }
}
