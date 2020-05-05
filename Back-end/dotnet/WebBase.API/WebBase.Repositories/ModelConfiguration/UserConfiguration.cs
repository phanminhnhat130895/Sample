using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;

namespace WebBase.Repositories.ModelConfiguration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");
            builder.HasKey(_ => _.USERID);
            builder.Property(_ => _.USERID).HasMaxLength(36);
            builder.Property(_ => _.USERNAME).HasMaxLength(50);
            builder.HasIndex(_ => _.USERNAME).IsUnique();
            builder.Property(_ => _.PASSWORD).HasMaxLength(500);
            //builder.Property(_ => _.Salt).HasMaxLength(100);
            builder.Property(_ => _.ROLE).HasMaxLength(15);
            builder.Property(_ => _.EMAIL).HasMaxLength(255);
            builder.Property(_ => _.ADDRESS).HasMaxLength(255);
        }
    }
}
