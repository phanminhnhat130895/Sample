using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace WebBase.Repositories.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        T FindSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties);

        IQueryable<T> FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);

        int Count(Expression<Func<T, bool>> predicate);

        void Add(T entity);

        void AddMulti(IList<T> listEntity);

        void Update(T entity);

        void UpdateMulti(IList<T> listEntity);

        void Remove(T entity);

        void RemoveMulti(IList<T> listEntity);

        void BeginTransaction();

        void RollbackTransaction();

        void CommitTransaction();
    }
}
