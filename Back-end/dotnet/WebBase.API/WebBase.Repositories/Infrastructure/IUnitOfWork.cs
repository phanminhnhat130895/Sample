using System;
using System.Collections.Generic;
using System.Text;

namespace WebBase.Repositories.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();

        void CommitWithConcurrency();
    }
}
